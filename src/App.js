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
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
        <Button>ADD FRIEND</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img>{friend.img}</img>
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
      <Button>SELECT</Button>
    </li>
  );
}
function Button({ children }) {
  return <button className="button">{children}</button>;
}
function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👫FRIEND NAME</label>
      <input type="text"></input>
      <label>🌄IMAGE URL</label>
      <input type="text"></input>
      <Button>ADD</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH X</h2>
      <label>💸BILL VALUE</label>
      <input type="text" />
      <label>🙋‍♂️YOUR EXPENSE</label>
      <input type="text" />
      <label>🙎‍♂️X'S EXPENSE</label>
      <input type="text" disabled />
      <label>🤑WHO IS PAYING THE BILL?</label>
      <select>
        <option value="user">YOU</option>
        <option value="friend">X</option>
      </select>
      <Button>SPLIT BILL</Button>
    </form>
  );
}
