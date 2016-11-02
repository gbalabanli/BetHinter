<?php
$callback = $_REQUEST['callback'];
$data = 
'{
    "text": "data",
    "items": [{
        "text": "Clothing",
        "items": [{
            "text": "T-shirt",
            "leaf": true
            
        }]
    },{
        "text": "Food",
        "items": [{
            "text": "Apple",
            "leaf": true
        },{
            "text": "Bread",
            "leaf": true
        }]
    }, {
        "text": "Hardware",
        "items": [{
            "text": "Hammer",
            "leaf": true
        },{
            "text": "Nail",
            "leaf": true
        },{
            "text": "Ladder",
            "leaf": true
        }
        ]
    }
    ]
}';

if ($callback) {
    header('Content-Type: text/javascript');
    echo $callback . '(' . $data . ');';
} else {
    header('Content-Type: application/x-json');
    echo $data;
}

?>