// Converts a Google Drive share link into a directly-embeddable image URL.
// Supports the common share formats:
//   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
//   https://drive.google.com/open?id=FILE_ID
//   https://drive.google.com/uc?id=FILE_ID&export=view
// Returns null if no file id can be found (not a recognized Drive link).
export function toDriveImageUrl(input) {
  const url = input.trim();
  if (!url) return null;

  const patterns = [/\/file\/d\/([\w-]+)/, /[?&]id=([\w-]+)/];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return `https://lh3.googleusercontent.com/d/${match[1]}=w1000`;
    }
  }

  return null;
}
