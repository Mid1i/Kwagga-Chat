import { ref, onMounted, onUnmounted } from "vue";
import { Client } from "@stomp/stompjs";

const useStomp = (url: string, publish: string, subscribe: string) => {
  const messages = ref<string[]>([]);
  let stompClient: Client;

	const sendMessage = (msg: string) => {
		const body = JSON.stringify({ message: msg });
    if (stompClient && stompClient.connected) stompClient.publish({ 
			destination: publish, 
			headers: {
				"recepient-id": "3d42469a-ab64-49f9-98f8-a27f0e8dc5d8"
			},
			body: body 
		});
  };


  onMounted(() => {
    stompClient = new Client({
      brokerURL: url,
			connectHeaders: {
				Authorization: `Bearer `
			},
      reconnectDelay: 100000,
      onConnect: () => {
        console.log("Connected to STOMP");
        stompClient.subscribe(subscribe, (message) => {
          messages.value.push(message.body);
					console.log(message.body)
        });
				stompClient.subscribe("/user/602db6a0-fb19-4cfb-a9bd-aa5d9cc8cd96/errors", (message) => {
					console.log(message.body)
        });
      },
      onDisconnect: () => {
        console.log("Disconnected from STOMP");
      },
			onStompError: (error) => {
				console.log(error)
			}
    });

    stompClient.activate();
  });

  onUnmounted(() => stompClient.deactivate());

  return { 
		messages, 
		sendMessage 
	}
};


export default useStomp;
