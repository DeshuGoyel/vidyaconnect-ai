import { config } from "@/constants/config";

export function getAgoraConfig(channelName: string) {
  return {
    appId: config.agoraAppId,
    channelName
  };
}
