import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/lib/pusher";

const useActiveChannel = () => {
  const { add, remove, set } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    if (!channel) channel = pusherClient.subscribe("presence-messanger");

    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );

      set(initialMembers);
    });

    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      add(member.id);
    });

    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      remove(member.id);
    });

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe("presence-messanger");
        setActiveChannel(null);
      }
    };
  }, [activeChannel, set, add, remove]);
};

export default useActiveChannel;
