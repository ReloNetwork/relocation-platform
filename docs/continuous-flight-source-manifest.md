# Relo continuous-flight source manifest

This manifest records the approved Higgsfield source clips embedded in
`public/films/relo-continuous-flight-desktop.mp4` (35.291667 seconds).

| Master offset | Approved source | Source dimensions | Source duration | SHA-256 |
| --- | --- | ---: | ---: | --- |
| 00:00.000 | Approved opening aerial leg embedded in the desktop master | 1920×1080 | 5.041667s | Preserved from the approved master |
| 00:05.042 | `01-TowerBridge-River.mp4` | 1920×1080 | 5.041667s | `9e96901820d80d2d76e3983a2d787e3da65cbd3005974e017d50fddab9915be8` |
| 00:10.083 | `02-River-Underpass.mp4` | 1920×1080 | 5.041667s | `21da0d95388996a7cdc8672775bf7e0058534dec1dc302700c50cd5d2c7800d3` |
| 00:15.125 | `03-Underpass-Walkway.mp4` | 1920×1080 | 5.041667s | `0e34856b9a67b8417ab5a791b9ae0b2f6a8c76f962e08c49ca73089ebba86f94` |
| 00:20.167 | `04-Walkway-BlackDoor.mp4` | 1920×1080 | 5.041667s | `07c041661dc34a7339f17641a256899eafaa93212d645ab3337982df06e349c4` |
| 00:25.208 | `05-BlackDoor-BlueDoor.mp4` | 1280×720 | 5.061950s | `de27b030155e66a8cb6c2791dabd34bdf02e724a291759a8993f14504c530b47` |
| 00:30.270 | `06-BlueDoor-Entrance.mp4` | 1280×720 | 5.061950s | `9b813bf419a74310e7de61eaccd09e3351f7adaecfc4e4af8675ca9d907cd5c8` |

The final two supplied clips are 1280×720 at source. They are preserved in the
1920×1080 delivery master without describing them as native 1080p footage.

Frame comparisons at each master offset produced SSIM scores between 0.9688
and 0.9899 against the uploaded source frames. The small difference is the
expected result of the web-delivery encode.
