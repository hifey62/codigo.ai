import MonacoEditor from "@monaco-editor/react";

import { useState } from "react";
import {
  FileText,
  Search,
  GitBranch,
  Play,
  Package,
  X,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  File,
  Plus,
  MessageSquare,
  Terminal,
  Settings,
  Command,
  FilePlus,
  FolderPlus,
  MoreHorizontal,
  Trash2,
  Edit3,
} from "lucide-react";

// Mock file system data
const initialFileSystem = [
  {
    id: "1",
    name: "src",
    type: "folder",
    expanded: true,
    children: [
      {
        id: "2",
        name: "lib",
        type: "folder",
        expanded: false,
        children: [
          { id: "3", name: "lib.rs", type: "file", extension: "rs" },
          { id: "4", name: "utils.rs", type: "file", extension: "rs" },
        ],
      },
      {
        id: "5",
        name: "programs",
        type: "folder",
        expanded: true,
        children: [
          { id: "6", name: "escrow.rs", type: "file", extension: "rs" },
          { id: "7", name: "token.rs", type: "file", extension: "rs" },
        ],
      },
      { id: "8", name: "main.rs", type: "file", extension: "rs" },
    ],
  },
  {
    id: "9",
    name: "tests",
    type: "folder",
    expanded: false,
    children: [
      { id: "10", name: "integration.rs", type: "file", extension: "rs" },
    ],
  },
  { id: "11", name: "Cargo.toml", type: "file", extension: "toml" },
  { id: "12", name: "README.md", type: "file", extension: "md" },
];

// Mock file contents
// const fileContents = {
//   "escrow.rs": `use anchor_lang::prelude::*;

// declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

// #[program]
// pub mod escrow {
//     use super::*;

//     pub fn initialize(ctx: Context<Initialize>, amount: u64) -> Result<()> {
//         let escrow_account = &mut ctx.accounts.escrow_account;
//         escrow_account.initializer_key = *ctx.accounts.initializer.key;
//         escrow_account.temp_token_account_key = *ctx.accounts.temp_token_account.key;
//         escrow_account.initializer_deposit_token_account_key =
//             *ctx.accounts.initializer_deposit_token_account.key;
//         escrow_account.initializer_receive_token_account_key =
//             *ctx.accounts.initializer_receive_token_account.key;
//         escrow_account.expected_amount = amount;

//         Ok(())
//     }
// }

// #[derive(Accounts)]
// pub struct Initialize<'info> {
//     #[account(mut)]
//     pub initializer: Signer<'info>,
//     #[account(
//         init,
//         payer = initializer,
//         space = 8 + EscrowAccount::LEN
//     )]
//     pub escrow_account: Account<'info, EscrowAccount>,
//     pub system_program: Program<'info, System>,
// }

// #[account]
// pub struct EscrowAccount {
//     pub initializer_key: Pubkey,
//     pub temp_token_account_key: Pubkey,
//     pub initializer_deposit_token_account_key: Pubkey,
//     pub initializer_receive_token_account_key: Pubkey,
//     pub expected_amount: u64,
// }

// impl EscrowAccount {
//     pub const LEN: usize = 32 + 32 + 32 + 32 + 8;
// }`,
//   "main.rs": `use std::io;

// fn main() {
//     println!("Welcome to Código - Solana Development Environment!");

//     // Initialize the development environment
//     init_solana_environment();
// }

// fn init_solana_environment() {
//     println!("Initializing Solana development tools...");
//     // Setup code here
// }`,
//   "Cargo.toml": `[package]
// name = "codigo-solana-project"
// version = "0.1.0"
// edition = "2021"

// [dependencies]
// anchor-lang = "0.28.0"
// anchor-spl = "0.28.0"
// solana-program = "1.16.0"

// [dev-dependencies]
// tokio = { version = "1.0", features = ["full"] }
// `,
// };

export default function CodigoIDE() {
  const [activeTab, setActiveTab] = useState("Welcome");
  const [tabs, setTabs] = useState(["Welcome"]);
  const [fileContents, setFileContents] = useState({
    "escrow.rs": `use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod escrow {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, amount: u64) -> Result<()> {
        let escrow_account = &mut ctx.accounts.escrow_account;
        escrow_account.initializer_key = *ctx.accounts.initializer.key;
        escrow_account.temp_token_account_key = *ctx.accounts.temp_token_account.key;
        escrow_account.initializer_deposit_token_account_key = 
            *ctx.accounts.initializer_deposit_token_account.key;
        escrow_account.initializer_receive_token_account_key = 
            *ctx.accounts.initializer_receive_token_account.key;
        escrow_account.expected_amount = amount;
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub initializer: Signer<'info>,
    #[account(
        init,
        payer = initializer,
        space = 8 + EscrowAccount::LEN
    )]
    pub escrow_account: Account<'info, EscrowAccount>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct EscrowAccount {
    pub initializer_key: Pubkey,
    pub temp_token_account_key: Pubkey,
    pub initializer_deposit_token_account_key: Pubkey,
    pub initializer_receive_token_account_key: Pubkey,
    pub expected_amount: u64,
}

impl EscrowAccount {
    pub const LEN: usize = 32 + 32 + 32 + 32 + 8;
}`,
    "main.rs": `use std::io;

fn main() {
    println!("Welcome to Código - Solana Development Environment!");
    
    // Initialize the development environment
    init_solana_environment();
}

fn init_solana_environment() {
    println!("Initializing Solana development tools...");
    // Setup code here
}`,
    "Cargo.toml": `[package]
name = "codigo-solana-project"
version = "0.1.0"
edition = "2021"

[dependencies]
anchor-lang = "0.28.0"
anchor-spl = "0.28.0"
solana-program = "1.16.0"

[dev-dependencies]
tokio = { version = "1.0", features = ["full"] }`,
  });

  const getLanguageFromFilename = (filename) => {
    if (filename.endsWith(".rs")) return "rust";
    if (filename.endsWith(".toml")) return "toml";
    if (filename.endsWith(".js")) return "javascript";
    return "plaintext";
  };

  const [fileSystem, setFileSystem] = useState(initialFileSystem);
  const [selectedFile, setSelectedFile] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "ai",
      content:
        "Hello! I'm Código AI. I can help you with Solana development. What would you like to work on?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  const [contextMenu, setContextMenu] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createModalType, setCreateModalType] = useState("file");
  const [createModalParent, setCreateModalParent] = useState(null);
  const [createModalName, setCreateModalName] = useState("");
  const [nextId, setNextId] = useState(20);

  // const findItemById = (items, id) => {
  //   for (const item of items) {
  //     if (item.id === id) return item;
  //     if (item.children) {
  //       const found = findItemById(item.children, id);
  //       if (found) return found;
  //     }
  //   }
  //   return null;
  // };

  const addItemToParent = (items, parentId, newItem) => {
    return items.map((item) => {
      if (item.id === parentId) {
        return {
          ...item,
          children: [...(item.children || []), newItem],
          expanded: true,
        };
      }
      if (item.children) {
        return {
          ...item,
          children: addItemToParent(item.children, parentId, newItem),
        };
      }
      return item;
    });
  };

  const deleteItemById = (items, id) => {
    return items
      .filter((item) => item.id !== id)
      .map((item) => ({
        ...item,
        children: item.children
          ? deleteItemById(item.children, id)
          : item.children,
      }));
  };

  const openWelcomeTab = () => {
    if (!tabs.includes("Welcome")) {
      setTabs((prev) => [...prev, "Welcome"]);
    }
    setActiveTab("Welcome");
  };
  const renameItemById = (items, id, newName) => {
    return items.map((item) => {
      if (item.id === id) {
        return { ...item, name: newName };
      }
      if (item.children) {
        return {
          ...item,
          children: renameItemById(item.children, id, newName),
        };
      }
      return item;
    });
  };

  const createNewItem = (type, name, parentId = null) => {
    const extension = name.includes(".") ? name.split(".").pop() : "";
    const newItem = {
      id: nextId.toString(),
      name,
      type,
      ...(type === "file" && { extension }),
      ...(type === "folder" && { expanded: false, children: [] }),
    };

    setNextId((prev) => prev + 1);

    if (parentId) {
      setFileSystem((prev) => addItemToParent(prev, parentId, newItem));
    } else {
      setFileSystem((prev) => [...prev, newItem]);
    }

    if (type === "file") {
      fileContents[name] = `// New ${extension} file
// Start coding here...`;
    }

    return newItem;
  };

  const handleContextMenu = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      item,
    });
  };

  const handleCreateNew = (type, parentItem = null) => {
    setCreateModalType(type);
    setCreateModalParent(parentItem);
    setCreateModalName("");
    setShowCreateModal(true);
    setContextMenu(null);
  };

  const handleCreateSubmit = () => {
    if (!createModalName.trim()) return;

    const newItem = createNewItem(
      createModalType,
      createModalName.trim(),
      createModalParent?.id
    );

    setShowCreateModal(false);
    setCreateModalName("");

    if (createModalType === "file") {
      openFile(newItem);
    }
  };

  const handleDelete = (item) => {
    setFileSystem((prev) => deleteItemById(prev, item.id));

    if (tabs.includes(item.name)) {
      closeTab(item.name);
    }

    setContextMenu(null);
  };

  const handleRename = (item, newName) => {
    const oldName = item.name;
    setFileSystem((prev) => renameItemById(prev, item.id, newName));

    if (tabs.includes(oldName)) {
      setTabs((prev) => prev.map((tab) => (tab === oldName ? newName : tab)));
      if (activeTab === oldName) {
        setActiveTab(newName);
      }
      if (fileContents[oldName]) {
        fileContents[newName] = fileContents[oldName];
        delete fileContents[oldName];
      }
    }
  };

  const toggleFolder = (id) => {
    const toggleInTree = (items) => {
      return items.map((item) => {
        if (item.id === id && item.type === "folder") {
          return { ...item, expanded: !item.expanded };
        }
        if (item.children) {
          return { ...item, children: toggleInTree(item.children) };
        }
        return item;
      });
    };
    setFileSystem(toggleInTree(fileSystem));
  };

  const openFile = (file) => {
    if (file.type === "file") {
      setSelectedFile(file);
      const fileName = file.name;
      if (!tabs.includes(fileName)) {
        setTabs((prev) => [...prev, fileName]);
      }
      setActiveTab(fileName);
    }
  };

  const closeTab = (tab) => {
    const remainingTabs = tabs.filter((t) => t !== tab);
    setTabs(remainingTabs);

    if (activeTab === tab) {
      if (remainingTabs.length > 0) {
        setActiveTab(remainingTabs[remainingTabs.length - 1]);
      } else {
        setActiveTab(null);
        setSelectedFile(null);
      }
    }
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;

    const newMessage = { type: "user", content: chatInput };
    setChatMessages((prev) => [...prev, newMessage]);
    setChatInput("");

    setTimeout(() => {
      const aiResponse = {
        type: "ai",
        content: `I can help you with that! For Solana development, I recommend focusing on understanding PDAs (Program Derived Addresses) and proper account management. Would you like me to explain more about the escrow program structure?`,
      };
      setChatMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getFileIcon = (file) => {
    if (file.type === "folder") {
      return file.expanded ? (
        <FolderOpen className="w-4 h-4 text-blue-400" />
      ) : (
        <Folder className="w-4 h-4 text-blue-400" />
      );
    }

    const iconMap = {
      rs: "🦀",
      toml: "⚙️",
      md: "📝",
      js: "🟨",
      ts: "🔷",
      json: "🔧",
    };

    return <span className="text-sm">{iconMap[file.extension] || "📄"}</span>;
  };

  const renderFileTree = (items, depth = 0) => {
    return items.map((item) => (
      <div key={item.id}>
        <div
          className={`flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer text-sm group relative ${
            selectedFile?.id === item.id
              ? "bg-gray-700 text-orange-400"
              : "text-gray-300"
          }`}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() =>
            item.type === "folder" ? toggleFolder(item.id) : openFile(item)
          }
          onContextMenu={(e) => handleContextMenu(e, item)}
        >
          {item.type === "folder" && (
            <span className="mr-1">
              {item.expanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </span>
          )}
          <span className="mr-2">{getFileIcon(item)}</span>
          <span className="flex-1">{item.name}</span>

          {item.type === "folder" && (
            <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1 ml-2">
              <FilePlus
                className="w-3 h-3 text-gray-400 hover:text-green-400 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateNew("file", item);
                }}
                title="New File"
              />
              <FolderPlus
                className="w-3 h-3 text-gray-400 hover:text-blue-400 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateNew("folder", item);
                }}
                title="New Folder"
              />
            </div>
          )}
        </div>
        {item.type === "folder" && item.expanded && item.children && (
          <div>{renderFileTree(item.children, depth + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 font-mono overflow-hidden">
      {/* Context Menu */}
      {contextMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setContextMenu(null)}
          />
          <div
            className="fixed z-50 bg-gray-800 border border-gray-600 rounded shadow-lg py-1 min-w-48"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            {contextMenu.item.type === "folder" && (
              <>
                <div
                  className="px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm flex items-center"
                  onClick={() => handleCreateNew("file", contextMenu.item)}
                >
                  <FilePlus className="w-4 h-4 mr-2 text-green-400" />
                  New File
                </div>
                <div
                  className="px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm flex items-center"
                  onClick={() => handleCreateNew("folder", contextMenu.item)}
                >
                  <FolderPlus className="w-4 h-4 mr-2 text-blue-400" />
                  New Folder
                </div>
                <div className="border-t border-gray-600 my-1" />
              </>
            )}
            <div
              className="px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm flex items-center"
              onClick={() => {
                const newName = prompt("Rename to:", contextMenu.item.name);
                if (newName && newName !== contextMenu.item.name) {
                  handleRename(contextMenu.item, newName);
                }
                setContextMenu(null);
              }}
            >
              <Edit3 className="w-4 h-4 mr-2 text-yellow-400" />
              Rename
            </div>
            <div
              className="px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm flex items-center text-red-400"
              onClick={() => {
                if (confirm(`Delete ${contextMenu.item.name}?`)) {
                  handleDelete(contextMenu.item);
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </div>
          </div>
        </>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 border border-gray-600 rounded-lg p-6 z-50 min-w-96">
            <h3 className="text-lg font-medium mb-4 text-white">
              Create New {createModalType === "file" ? "File" : "Folder"}
              {createModalParent && (
                <span className="text-gray-400">
                  {" "}
                  in {createModalParent.name}
                </span>
              )}
            </h3>
            <input
              type="text"
              value={createModalName}
              onChange={(e) => setCreateModalName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleCreateSubmit();
                if (e.key === "Escape") setShowCreateModal(false);
              }}
              placeholder={
                createModalType === "file" ? "filename.rs" : "folder-name"
              }
              className="w-full bg-gray-700 text-gray-200 px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSubmit}
                disabled={!createModalName.trim()}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </div>
        </>
      )}

      {/* Top Menu Bar */}
      <div className="flex items-center px-4 h-10 bg-gray-800 border-b border-gray-700 text-sm">
        {"File Edit Selection View Go Run Terminal Help"
          .split(" ")
          .map((item) => (
            <div
              key={item}
              className="mr-4 cursor-pointer hover:text-orange-400 transition-colors"
            >
              {item}
            </div>
          ))}
        <div className="ml-auto flex items-center space-x-2">
          <Command className="w-4 h-4 text-gray-400 hover:text-orange-400 cursor-pointer" />
          <Settings className="w-4 h-4 text-gray-400 hover:text-orange-400 cursor-pointer" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-16 bg-gray-800 flex flex-col justify-between items-center py-2">
          <div className="space-y-4">
            <FileText className="w-5 h-5 text-orange-400 cursor-pointer" />
            <Search className="w-5 h-5 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
            <GitBranch className="w-5 h-5 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
            <Play className="w-5 h-5 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
            <Package className="w-5 h-5 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* File Explorer Panel */}
        <div className="w-80 bg-gray-850 border-r border-gray-700 text-sm overflow-hidden flex flex-col">
          <div className="p-3 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-300 text-xs">EXPLORER</span>
              <div className="flex items-center space-x-1">
                <FilePlus
                  className="w-4 h-4 text-gray-400 hover:text-green-400 cursor-pointer"
                  onClick={() => handleCreateNew("file")}
                  title="New File"
                />
                <FolderPlus
                  className="w-4 h-4 text-gray-400 hover:text-blue-400 cursor-pointer"
                  onClick={() => handleCreateNew("folder")}
                  title="New Folder"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              <div className="text-xs text-gray-400 mb-2 font-semibold">
                CÓDIGO PROJECT
              </div>
              {renderFileTree(fileSystem)}
            </div>
          </div>

          <div className="p-2 border-t border-gray-700">
            <div className="p-2 border-l-4 border-yellow-500 text-yellow-400 bg-gray-800 text-xs rounded">
              ⚠️ Remember to save your changes
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab bar */}
          <div className="flex h-10 bg-gray-800 border-b border-gray-700 text-sm overflow-x-auto">
            {tabs.map((tab) => (
              <div
                key={tab}
                className={`flex items-center px-4 cursor-pointer whitespace-nowrap border-r border-gray-700 min-w-max ${
                  tab === activeTab
                    ? "bg-gray-900 text-white border-b-2 border-orange-400"
                    : "text-gray-400 hover:text-white hover:bg-gray-750"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                <span>{tab}</span>
                <X
                  className="ml-2 w-4 h-4 hover:text-red-500 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab);
                  }}
                />
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Editor/Welcome Content */}
            <div className="flex-1 overflow-y-auto">
              {!activeTab ? (
                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                  No file is open. Use the sidebar or buttons to open a file.
                </div>
              ) : activeTab === "Welcome" ? (
                <div className="p-8">
                  <h1 className="text-3xl text-orange-400 font-semibold mb-4">
                    👋 Welcome to Código
                  </h1>
                  <h2 className="text-lg text-gray-300 mb-6">
                    Your AI powered development environment for building on
                    Solana.
                  </h2>
                  <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                    Here, you can create, explore, and deploy smart contracts
                    with the help of an integrated AI developer platform. You
                    can get started by exploring the file tree, opening files,
                    or chatting with Código AI.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <h3 className="text-lg text-orange-300 font-medium mb-2">
                        🗂️ File Explorer
                      </h3>
                      <p className="text-sm text-gray-400">
                        Navigate through your project files. Click on folders to
                        expand them and files to open them in the editor.
                      </p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <h3 className="text-lg text-orange-300 font-medium mb-2">
                        💬 AI Assistant
                      </h3>
                      <p className="text-sm text-gray-400">
                        Chat with Código AI for help with Solana development,
                        code reviews, and smart contract guidance.
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl text-white font-medium mb-4">
                      🚀 Quick Actions
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <button
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition-colors"
                        onClick={() =>
                          openFile({
                            id: "6",
                            name: "escrow.rs",
                            type: "file",
                            extension: "rs",
                          })
                        }
                      >
                        Open Escrow Contract
                      </button>
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                        onClick={() => setChatOpen(true)}
                      >
                        Chat with AI
                      </button>
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                        onClick={() => setTerminalOpen(true)}
                      >
                        Open Terminal
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // File Editor
                <div className="h-full">
                  <div className="p-4 h-full bg-gray-900">
                    <div className="bg-gray-800 p-4 rounded border border-gray-700 h-full overflow-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-orange-400 font-medium">
                          {activeTab}
                        </span>
                        <span className="text-xs text-gray-400">
                          Rust • Solana Program
                        </span>
                      </div>
                      <MonacoEditor
                        height="100%"
                        language={getLanguageFromFilename(activeTab)} // Optional helper
                        theme="vs-dark"
                        value={fileContents[activeTab] || ""}
                        onChange={(newValue) => {
                          setFileContents((prev) => ({
                            ...prev,
                            [activeTab]: newValue,
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Chat Panel */}
            {chatOpen && (
              <div className="w-80 bg-gray-850 border-l border-gray-700 flex flex-col">
                <div className="p-3 border-b border-gray-700 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-orange-400" />
                    <span className="font-medium text-gray-300">Código AI</span>
                  </div>
                  <X
                    className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer"
                    onClick={() => setChatOpen(false)}
                  />
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg text-sm ${
                          message.type === "user"
                            ? "bg-orange-600 text-white"
                            : "bg-gray-700 text-gray-200"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-gray-700">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Ask about your code..."
                      className="flex-1 bg-gray-700 text-gray-200 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded text-sm transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!tabs.includes("Welcome") && (
            <button
              onClick={openWelcomeTab}
              className="mx-3 my-2 px-3 py-1 bg-orange-700 text-white text-xs rounded hover:bg-orange-600 transition"
            >
              ✨ Show Welcome Screen
            </button>
          )}

          {/* Terminal Panel */}
          {terminalOpen && (
            <div className="h-64 bg-black border-t border-gray-700 flex flex-col">
              <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Terminal</span>
                </div>
                <X
                  className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer"
                  onClick={() => setTerminalOpen(false)}
                />
              </div>
              <div className="flex-1 p-3 text-green-400 font-mono text-sm overflow-y-auto">
                <div>código@solana-dev:~/project$ cargo build</div>
                <div className="text-gray-400">
                  {" "}
                  Compiling codigo-solana-project v0.1.0
                </div>
                <div className="text-gray-400">
                  {" "}
                  Finished dev [unoptimized + debuginfo] target(s) in 2.43s
                </div>
                <div>código@solana-dev:~/project$ anchor test</div>
                <div className="text-gray-400">
                  BPF SDK:
                  /Users/.local/share/solana/install/releases/1.16.0/solana-release/bin/sdk/bpf
                </div>
                <div className="text-green-400">✓ All tests passed!</div>
                <div className="flex items-center">
                  <span>código@solana-dev:~/project$ </span>
                  <div className="w-2 h-4 bg-green-400 ml-1 animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between h-6 bg-blue-600 px-4 text-xs text-white">
        <div className="flex items-center space-x-4">
          <span>🔗 main</span>
          <span>↑ 0 ↓ 0</span>
          <span>Solana Devnet</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Rust 1.70.0</span>
          <span>Anchor 0.28.0</span>
          <span>Código AI: Ready</span>
        </div>
      </div>
    </div>
  );
}
