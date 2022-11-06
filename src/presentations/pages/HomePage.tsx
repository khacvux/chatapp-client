import ChatContainer from "../components/ChatContainer.tsx/ChatContainer";
import ContactsContainer from "../components/ContactsContainer";

export default function HomePage() {
  return (
    <div className=" w-screen h-screen flex flex-row " >
        <div className="w-[360px] h-full" >
          <ContactsContainer />
        </div>
        <div className=" flex-1 h-full">
          <ChatContainer />
        </div>

    </div>
  )
}
