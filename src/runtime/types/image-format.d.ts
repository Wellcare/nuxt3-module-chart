/** docs: https://github.com/h2non/imaginary */
type imageOutputFormat = 'jpeg' | 'png' | 'webp' | 'auto'

export interface ImageFormat {
    /** Width of image area to extract/resize */
    width?: number
    /** Height of image area to extract/resize */
    height?: number
    /** Top edge of area to extract. Example: 100 */
    top?: number
    /** Left edge of area to extract. Example: 100 */
    left?: number
    /** Height area to extract. Example: 300 */
    areaWidth?: number
    /** Width area to extract. Example: 300 */
    areaHeight?: number
    /** JPEG image quality between 1-100. Defaults to 80 */
    quality?: number
    /** PNG compression level. Default: 6 */
    compression?: number
    /** Enable 8-bit quantization. Works with only PNG images. Default: false */
    palette?: boolean
    /** Image rotation angle. Must be multiple of 90. Example: 180 */
    rotate?: number
    /** Zoom factor level. Example: 2 */
    factor?: number
    /** Text area margin for watermark. Example: 50 */
    margin?: number
    /** DPI value for watermark. Example: 150 */
    dpi?: number
    /** Text area width for watermark. Example: 200 */
    textWidth?: number
    /** Opacity level for watermark text or watermark image. Default: 0.2 */
    opacity?: number
    /** Transform the resultant image with flip operation. Default: false */
    flip?: boolean
    /** Transform the resultant image with flop operation. Default: false */
    flop?: boolean
    /** Force image transformation size. Default: false */
    force?: boolean
    /** Disable crop transformation. Defaults depend on the operation */
    noCrop?: boolean
    /** Disable text replication in watermark. Defaults to false */
    noReplicate?: boolean
    /** Disable auto rotation based on EXIF orientation. Defaults to false */
    noRotation?: boolean
    /** Disable adding ICC profile metadata. Defaults to false */
    noProfile?: boolean
    /** Remove original image metadata, such as EXIF metadata. Defaults to false */
    stripMeta?: boolean
    /** Watermark text content. Example: copyright (c) 2189 */
    text?: string
    /** Watermark text font type and format. Example: sans bold 12 */
    font?: string
    /** Watermark text RGB decimal base color. Example: 255,200,150 */
    color?: string
    /** Watermark image URL pointing to the remote HTTP server. */
    image?: string
    /** Specify the image format to output. Possible values are: jpeg, png, webp and auto. auto will use the preferred format requested by the client in the HTTP Accept header. A client can provide multiple comma-separated choices in Accept with the best being the one picked. */
    type?: imageOutputFormat
    /** Define the crop operation gravity. Supported values are: north, south, centre, west, east and smart. Defaults to centre. */
    gravity?: string
    /** Use image from server local file path. In order to use this you must pass the -mount=<dir> flag. */
    file?: string
    /** Fetch the image from a remote HTTP server. In order to use this you must pass the -enable-url-source flag. */
    url?: string
    /** Use a custom color space for the output image. Allowed values are: srgb or bw (black&white) */
    colorspace?: string
    /** Custom image form field name if using multipart/form. Defaults to: file */
    field?: string
    /** Extend represents the image extend mode used when the edges of an image are extended. Defaults to mirror. Allowed values are: black, copy, mirror, white, lastpixel and background. If background value is specified, you can define the desired extend RGB color via background param, such as ?extend=background&background=250,20,10. For more info, see libvips docs. */
    extend?: string
    /** Background RGB decimal base color to use when flattening transparent PNGs. Example: 255,200,150 */
    background?: string
    /** Size of the gaussian mask to use when blurring an image. Example: 15.0 */
    sigma?: number
    /** Minimum amplitude of the gaussian filter to use when blurring an image. Default: Example: 0.5 */
    minampl?: number
    /** Pipeline of image operation transformations defined as URL safe encoded JSON array. See pipeline endpoints for more details. */
    operations?: any
    /** URL signature (URL-safe Base64-encoded HMAC digest) */
    sign?: string
    /** Use progressive / interlaced format of the image output. Defaults to false */
    interlace?: boolean
    /** Apply aspect ratio by giving either image's height or width. Example: 16:9 */
    aspectRatio?: string
}
