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
				Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKc3dISW1HRjdib2JJd2VRb1lSVEU5LTRVX0lYcHJzaTNrTlVsUEhCS2JVIn0.eyJleHAiOjE3NDIxNjM3NjEsImlhdCI6MTc0MjE0NTc2MSwiYXV0aF90aW1lIjoxNzQyMTQ1NzYwLCJqdGkiOiI1OGZkNjM3NS02NzBiLTRjMDktYmZmNi0yNTZhZTBhZTI4MjIiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxMDAvcmVhbG1zL2t3YWdnYSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI2MDJkYjZhMC1mYjE5LTRjZmItYTliZC1hYTVkOWNjOGNkOTYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJkb2MiLCJzaWQiOiJkOGY5MDgyMy00NTY3LTQxYTEtOTNmZC00MzU5NmYyNDczMzUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1rd2FnZ2EiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImRvYyI6eyJyb2xlcyI6WyJ1c2VyIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiLQoNGD0YHRgtCw0Lwg0KXRg9C00L7Rj9C9IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZHJlYW1hbmcydG9wbGF5QHlhbmRleC5ydSIsImdpdmVuX25hbWUiOiLQoNGD0YHRgtCw0LwiLCJmYW1pbHlfbmFtZSI6ItCl0YPQtNC-0Y_QvSIsImVtYWlsIjoiZHJlYW1hbmcydG9wbGF5QHlhbmRleC5ydSJ9.I2wxkN9ORO-YLJtTTudDxZDKUefcEW7E_neAY0Gxqm_ykFv5L_a17YHkf_xXaQmR4X8HEg75A6s-WP7w_boD59ZbJyv4VKvFhNt1a67NtIRU8-xNXO2dEzaBI6mgVNpK_tg77d_xay6QPcIRFFRmmFMt-PB0TYyb1WOZqCde8zXAAavYmlZ9WWWd6pspK3D55-LKscgtiFI0B3haVMURMkRtF5Pacfs6nHD4qDPHPnbZLNIO5b__flAwuHavrRMtHDDe86MSDVepOPi3JJaIdtQhZ7GyXJNBGYGALO90RGUUHs_JZUHtOw-jYATSC-eenV4_qWyWYz406ddblz9S-Q`
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
