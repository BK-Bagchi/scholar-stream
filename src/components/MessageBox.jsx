import { Send } from "lucide-react";
import { useState } from "react";

const MessageBox = ({ name, theme, handleSendRequest }) => {
  const [sending, setSending] = useState(false);
  return (
    <div
      className={`flex flex-col gap-3 p-5 border-t rounded-md transition-all duration-300 shadow-sm ${
        theme
          ? "bg-white border-gray-200"
          : "bg-gray-800 border-gray-700 shadow-gray-900/40"
      }`}
    >
      <p
        className={`text-lg font-semibold transition ${
          theme ? "text-gray-700" : "text-gray-100"
        }`}
      >
        Type a Message for {name}
      </p>

      <input
        type="text"
        placeholder="Write something nice..."
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
          theme
            ? "bg-gray-50 text-gray-800 placeholder-gray-500 border-gray-300 focus:ring-blue-400 hover:border-blue-400"
            : "bg-gray-700 text-gray-100 placeholder-gray-400 border-gray-600 focus:ring-blue-500 hover:border-blue-400/50"
        }`}
      />

      <button
        onClick={() => {
          setSending(true);
          handleSendRequest();
        }}
        className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
          theme
            ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
            : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
        }`}
      >
        <Send className="w-4 h-4" />
        <span>{sending ? "Sending..." : "Send"}</span>
      </button>
    </div>
  );
};

export default MessageBox;
