module.exports = {
    serverUrl: 'mongodb://localhost:27017',
    database: 'Li-Bo-CS554-Lab1',
    schema: {
        bsonType: "object",
        required: [
            "_id",
            "title",
            "description",
            "hoursEstimated",
            "completed",
            "comments"
        ],
        additionalProperties: false,
        properties: {
            title: {
                bsonType: "string"
            },
            _id: {
                bsonType: "string"
            },
            description: {
                bsonType: "string"
            },
            hoursEstimated: {
                bsonType: "int",
                minimum: 0
            },
            completed: {
                bsonType: "bool"
            },
            comments: {
                bsonType: "array",
                items: {
                    bsonType: "object",
                    additionalProperties: false,
                    required: [
                        "_id",
                        "name",
                        "comment"
                    ],
                    properties: {
                        _id: {
                            bsonType: "string"
                        },
                        name: {
                            bsonType: "string"
                        },
                        comment: {
                            bsonType: "string"
                        }
                    }
                }
            }
        }
    }
}