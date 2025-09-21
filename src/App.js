import { useState } from "react";
import "./index.css";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }
  function handleAddFriend(friend) {
    //this is important the concept of immutability
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "CLOSE" : `ADD FRIEND`}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  // const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          YOU OWE {friend.name.toUpperCase()} {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name.toUpperCase()} OWES YOU {Math.abs(friend.balance)} $
        </p>
      )}
      {friend.balance === 0 && (
        <p>YOU AND {friend.name.toUpperCase()} ARE EVEN.</p>
      )}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "SELECT" : "CLOSE"}
      </Button>
    </li>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=499476");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?= ${id}`,
      balance: 0,
      id,
    };
    console.log(newFriend);
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48?u=499476");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫FRIEND NAME</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌄IMAGE URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>ADD</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH {selectedFriend.name}</h2>
      <label>💸BILL VALUE</label>
      <input type="text" />
      <label>🙋‍♂️YOUR EXPENSE</label>
      <input type="text" />
      <label>🙎‍♂️{selectedFriend.name.toUpperCase()} EXPENSE</label>
      <input type="text" disabled />
      <label>🤑WHO IS PAYING THE BILL?</label>
      <select>
        <option value="user">YOU</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>SPLIT BILL</Button>
    </form>
  );
}
