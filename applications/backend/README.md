# Football Alerts backend
> Infrastructure for Football Alerts

## Article import process
### Steps
1. Select all sources
2. Iterate through sources one-by-one and save output to S3 bucket
    1. Convert description to JSON using `himalaya`
    2. Put image URL under `imageId` to pick up later for download
    3. Set status to `PENDING`
    4. Range will consist of `publishDate` as a timestamp, `status`, `sourceId` and `clubId` separated with `::`
3. Filter out any duplicate articles
4. Go through each set of articles and save the `imageId` field to S3 whilst updating the `imageId` field with a UUID

### Schema
#### Article
```json
[
  {
    "clubId": "",
    "createdAt": "",
    "description": "",
    "imageId": "",
    "link": "",
    "publishDate": "",
    "rangeKey": "publishDate(timestamp)::status::sourceId::clubId",
    "sourceId": "",
    "status": "PENDING",
    "title": "",
    "updatedAt": ""
  }
]
```

### Events
#### Image processing
```json
{
  "continue": false,
  "count": 4,
  "current": 1,
  "formats": [
    {
      "name": "small",
      "value": {
        "height": 100,
        "width": 100
      }
    },
    {
      "name": "medium",
      "value": {
        "height": 500,
        "width": 500
      }
    },
    {
      "name": "large",
      "value": {
        "height": 1000,
        "width": 1000
      }
    }
  ],
  "Images": [
    {
      "PutRequest": {
        "Item": {
          "id": ":id",
          "images": {
            "small": "/media/img/small/id.jpg",
            "medium": "/media/img/medium/id.jpg",
            "large": "/media/img/large/id.jpg"
          }
        }
      }
    }
  ],
  "items": [
    "/media/:clubId/image.jpg",
    "/media/:clubId/image.jpg",
    "/media/:clubId/image.jpg",
    "/media/:clubId/image.jpg"
  ]
}
```
