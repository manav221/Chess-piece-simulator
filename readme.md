# ♟️ Chess Game (JavaScript OOP)

A playable chess game built with **Vanilla JavaScript** to practice **Object-Oriented Programming (OOP)** concepts.

The main goal of this project was to improve OOP skills rather than implement every official chess rule.

---

## 📸 Preview

> [Chess Board](<Screenshot 2026-07-27 232809.png>)

---

## ✨ Features

- Playable two-player chess
- Piece selection
- Valid move highlighting
- Turn-based gameplay
- Piece capturing
- Check detection
- Checkmate detection
- Stalemate detection
- Game over detection

---

## ❌ Not Implemented

The following official chess rules are intentionally omitted:

- piece selection
- Castling
- En Passant
- Pawn Promotion Selection (only basic promotion if implemented)
- Threefold Repetition
- Fifty-Move Rule
- Insufficient Material Draw

---

## 🏗️ Project Structure

```
src/
│
├── game/
│   ├── Board.js
│   └── Game.js
│
├── pieces/
│   ├── Piece.js
│   ├── Pawn.js
│   ├── Rook.js
│   ├── Knight.js
│   ├── Bishop.js
│   ├── Queen.js
│   └── King.js
│
├── Renderer.js
└── app.js
```

---

## 🧠 OOP Concepts Practiced

- Classes
- Inheritance
- Polymorphism
- Encapsulation
- Composition
- Responsibility Separation
- State Management

---

## 🧩 Architecture

### Board

Responsible for:

- Storing the chess board
- Moving pieces
- Undoing moves
- Accessing board squares

### Piece

Base class for all chess pieces.

Every piece implements its own:

- `possibleMoves()`

Pawn also implements:

- `getAttackMoves()`

### Game

Responsible for all game rules.

Handles:

- Turn management
- Piece selection
- Legal moves
- Captures
- Check detection
- Checkmate detection
- Stalemate detection
- Game state

### Renderer

Responsible only for UI.

- Render board
- Render pieces
- Highlight selected piece
- Highlight legal moves

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/manav221/Chess-piece-simulator.git
```

Open the project folder:

```bash
cd chess-game
```

Run with any local server.

For example:

- VS Code Live Server

---

## 🛠️ Technologies Used

- HTML
- CSS
- Vanilla JavaScript (ES6 Modules)

---

## 📚 What I Learned

During this project I practiced:

- Designing classes and objects
- Keeping responsibilities separate
- Organizing a medium-sized project
- Writing reusable methods
- Simulating moves and undoing them
- Applying OOP principles in a real project

---

## 📌 Future Improvements

- Castling
- En Passant
- Pawn Promotion UI
- Move History
- Undo/Redo
- Check Indicator
- AI Opponent
- Online Multiplayer
- FEN Support
- PGN Export
- and, many more
---

## 📄 License

This project is created for learning purposes.