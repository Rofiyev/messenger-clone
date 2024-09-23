import getConversationById from "@/actions/getConversationBuId";
import getMessages from "@/actions/getMessages";
import EmptyState from "@/app/_components/empty-state";
import Header from "../_components/header";
import Main from "../_components/main";
import Form from "../_components/form";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div
          className="
          h-full
          flex
          flex-col
          "
        >
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div
        className="
        h-full
        flex
        flex-col
        "
      >
        <Header conversation={conversation} />
        <Main initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
