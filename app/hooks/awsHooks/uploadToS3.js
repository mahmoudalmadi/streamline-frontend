import CONFIG from "@/config";
  
export const fetchPresignedUrls = async ({files, s3Uri}) => {
    const response = await fetch(CONFIG.backendRoute+'aws/get-presigned-urls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        s3Uri,
        files: files.map((file) => ({
          fileName: file.file.name,
          fileType: file.file.type,
        })),
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch pre-signed URLs');
    }
  
    const { urls } = await response.json();
    return urls; // [{ fileName, url, key }]
  };
  
export const uploadImagesToS3 = async ({files, s3Uri}) => {
    try {
      // Fetch pre-signed URLs for all files
      const presignedUrls = await fetchPresignedUrls({files:files, s3Uri:s3Uri});
        
      // Upload each file using its corresponding pre-signed URL
      const uploadPromises = presignedUrls.map(({ url }, index) => {
        const file = files[index].file;
        return fetch(url, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        }).then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to upload ${file.name}`);
          }
          return url.split('?')[0]; // Return the S3 URL without query parameters
        });
      });
  
      const uploadedUrls = await Promise.all(uploadPromises);
      return uploadedUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  };
    