import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Icon } from "@iconify/react";
import BookPage from "./features/book/BookPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen w-screen">

        <header className="w-full p-4 text-center bg-black text-gray-100">
          <h1 className="text-xl">BomSLap - BERM stack</h1>
        </header>

        <main className="p-2">
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<BookPage/>} />
            </Routes>
          </BrowserRouter>
        </main>

        <footer className="w-full p-2 bg-black text-gray-100">
          <a
            className="flex gap-2"
            href="https://github.com/sompakorn-lap/basic-setup-berm-stack"
          >
          <Icon icon="mdi:github" width={24} height={24} />
          <span>GITHUB</span>
          </a>
        </footer>

      </div>
    </QueryClientProvider>
  );
}

export default App