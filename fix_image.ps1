Add-Type -AssemblyName System.Drawing
$inputPath = "c:/Users/Abhi/Desktop/saveweb2zip-com-johnson-template-webflow-io/images/hero_image_new.png"
$outputPath = "c:/Users/Abhi/Desktop/saveweb2zip-com-johnson-template-webflow-io/images/hero_image_new_fixed.png"
$bmp = New-Object System.Drawing.Bitmap($inputPath)
$newBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height)
$bgColor = [System.Drawing.Color]::FromArgb(255, 255, 232, 231) # #ffe8e7

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        
        # Check for white/grey checkers
        # Usually white is 255,255,255 and grey is 192/204/234
        # In the screenshot they look very light.
        $isLight = ($pixel.R -gt 200) -and ($pixel.G -gt 200) -and ($pixel.B -gt 200)
        
        # We also want to make sure we are not in the center area (the person)
        # The woman/man is centered.
        $centerX = $bmp.Width / 2
        $centerY = $bmp.Height * 0.55
        $dist = [Math]::Sqrt([Math]::Pow($x - $centerX, 2) + [Math]::Pow($y - $centerY, 2))
        
        if ($isLight -and ($dist -gt ($bmp.Width * 0.44))) {
            $newBmp.SetPixel($x, $y, $bgColor)
        } else {
            $newBmp.SetPixel($x, $y, $pixel)
        }
    }
}

$newBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$newBmp.Dispose()
Write-Host "Image fixed and saved."
