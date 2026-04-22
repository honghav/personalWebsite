"use server";

import { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export type CloudflareImage = {
  key: string;
  url: string;
};

const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file uploaded");
  }

  // Convert File to Buffer for the S3 Client
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    });

    const result = await r2Client.send(command);
    console.log("R2 Upload Result:", result);
    return { 
      success: true, 
      url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${fileName}` 
    };
  } catch (error: any) {
  console.error("R2 Upload Error:", error);
  // Return the actual message to see if it's "Access Denied" or "Invalid Endpoint"
  return { success: false, error: error.message || "Upload failed" };
}

}
// export async function getImageUrl(fileName: string) {
//   try {
//     const command = new GetObjectCommand({
//       Bucket: process.env.R2_BUCKET_NAME,
//       Key: fileName,
//     });

//     // URL expires in 3600 seconds (1 hour)
//     const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 });
    
//     return signedUrl;
//   } catch (error) {
//     console.error("Error generating signed URL:", error);
//     return null;
//   }
// }


