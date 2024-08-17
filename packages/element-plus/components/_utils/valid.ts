/**
 * Checks whether the specified source string represents the path or URL of an image file.
 *
 * This function uses a regular expression to match the source string with common image file extensions.
 * If the string ends with.jpg,.jpeg,.png, or.ico (case-insensitive), the function returns true,
 * indicating that it is likely an image file; otherwise, it returns false.
 *
 * The regular expression pattern is: /\.(jpg|jpeg|png|ico)$/i
 * - /\.(jpg|jpeg|png|ico)$/ matches the dot followed by one of the four extensions at the end of the string.
 * - i is a flag indicating case-insensitive matching.
 *
 * To use this function, pass the source string as a parameter. If the string is empty, it defaults to an empty string.
 *
 * Example usage:
 *   IsImage("image.jpg") // true
 *   IsImage("image.jpeg") // true
 *   IsImage("image.png") // true
 *   IsImage("image.ico") // true
 *   IsImage("non-image.txt") // false
 *   IsImage("") // false
 *
 * @param src The source string to check. Defaults to an empty string if not provided.
 * @returns True if the source string represents an image file, false otherwise.
 */
export function IsImage(src = '') {
  return src.match(/\.(jpg|jpeg|png|ico)$/i)
}
