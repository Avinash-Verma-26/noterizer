import axios from "axios";
import type { ConvertNotesProps } from "../../../types/types";
import { serverUrl } from "../../../main";

export async function convertNote({ encodedImage }: ConvertNotesProps) {
  try {
    const response = await axios.post(
      `${serverUrl}/ai/convertNote`,
      { encodedImage },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.log("Failed to convert image to text", error);
    throw error;
  }
}
