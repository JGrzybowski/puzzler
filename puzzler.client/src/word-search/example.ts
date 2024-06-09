export const wordSearchExample = {
    "array": [
        "G", "N", "L", "S", "P",
        "Y", "O", "X", "N", "A",
        "F", "X", "A", "N", "N",
        "E", "T", "N", "T", "D",
        "N", "Q", "J", "P", "A"
    ],
    "rows": 5,
    "cols": 5,
    "words": [
        {
            "word": "panda",
            "start": {
                "col": 4,
                "row": 0
            },
            "end": {
                "col": 4, 
                "row": 4
            }
        },
        {
            "word": "goat",
            "start": {
                "col": 0,
                "row": 0
            },
            "end": {
                "col": 0,
                "row": 3
            }
        }
    ],
    "foundWords": [{
        "word": "panda",
        "start": {
            "col": 4,
            "row": 0
        },
        "end": {
            "col": 4,
            "row": 4
        }
    }]
};