import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    // Read the file as an array buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length === 0) {
      return new Response(JSON.stringify({ error: "Empty file" }), {
        status: 400,
      });
    }

    const s3Client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    // Extract the file extension correctly
    const ext = file.name.split(".").pop();
    const newFileName = `${uniqid()}.${ext}`;

    const bucket = "scoop-haven-ice-cream";
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: newFileName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
      })
    );

    const link = `https://${bucket}.s3.amazonaws.com/${newFileName}`;
    return new Response(JSON.stringify(link), { status: 200 });
  } catch (error) {
    console.error("Upload Error:", error);
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 500,
    });
  }
}
