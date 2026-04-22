import { S3Client, PutObjectCommand, S3ServiceException } from "@aws-sdk/client-s3";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

type R2Env = {
  R2_ENDPOINT: string;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
  R2_BUCKET_NAME: string;
  NEXT_PUBLIC_R2_PUBLIC_URL: string;
};

function getR2Env(): { values: R2Env | null; missing: string[] } {
  const {
    R2_ENDPOINT,
    R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME,
    NEXT_PUBLIC_R2_PUBLIC_URL,
  } = process.env;

  const missing: string[] = [];

  if (!R2_ENDPOINT) missing.push("R2_ENDPOINT");
  if (!R2_ACCESS_KEY_ID) missing.push("R2_ACCESS_KEY_ID");
  if (!R2_SECRET_ACCESS_KEY) missing.push("R2_SECRET_ACCESS_KEY");
  if (!R2_BUCKET_NAME) missing.push("R2_BUCKET_NAME");
  if (!NEXT_PUBLIC_R2_PUBLIC_URL) missing.push("NEXT_PUBLIC_R2_PUBLIC_URL");

  if (missing.length > 0) {
    return { values: null, missing };
  }

  return {
    values: {
      R2_ENDPOINT,
      R2_ACCESS_KEY_ID,
      R2_SECRET_ACCESS_KEY,
      R2_BUCKET_NAME,
      NEXT_PUBLIC_R2_PUBLIC_URL,
    },
    missing,
  };
}

function createS3Client(env: R2Env) {
  return new S3Client({
    region: "auto",
    endpoint: env.R2_ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
  });
}

function createObjectKey(originalFileName: string) {
  const cleanedName = originalFileName
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const extension = originalFileName.split(".").pop()?.toLowerCase();
  const baseName = cleanedName || "image";
  const suffix = extension ? `.${extension}` : "";

  return `uploads/${Date.now()}-${crypto.randomUUID()}-${baseName}${suffix}`;
}

export async function POST(req: Request) {
  try {
    const { values: env, missing } = getR2Env();

    if (!env) {
      return Response.json(
        {
          error: "Missing Cloudflare R2 environment variables",
          missing,
        },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "File missing" }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return Response.json({ error: "Invalid file payload" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return Response.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      return Response.json(
        { error: "Image is too large (max 10MB)" },
        { status: 400 }
      );
    }

    const s3 = createS3Client(env);
    const key = createObjectKey(file.name);
    const body = new Uint8Array(await file.arrayBuffer());

    await s3.send(
      new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: file.type,
      })
    );

    const publicBaseUrl = env.NEXT_PUBLIC_R2_PUBLIC_URL.replace(/\/$/, "");
    const imageUrl = `${publicBaseUrl}/${encodeURI(key)}`;

    return Response.json({
      success: true,
      url: imageUrl,
      key,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof S3ServiceException) {
      return Response.json(
        {
          error: "Cloudflare R2 upload failed",
          details: error.message,
          code: error.name,
        },
        { status: 500 }
      );
    }

    if (error instanceof Error) {
      return Response.json(
        {
          error: "Upload failed",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}