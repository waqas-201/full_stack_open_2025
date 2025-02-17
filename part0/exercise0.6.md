sequenceDiagram
    participant browser
    participant server

    Note left of browser: User writes note and clicks Save

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: JSON response {message: "note created"}
    deactivate server

    Note right of browser: Client-side JS updates local notes array and re-renders UI