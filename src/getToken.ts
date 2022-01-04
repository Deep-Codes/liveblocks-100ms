const endPoint = process.env.NEXT_PUBLIC_HMS_TOKEN_ENDPOINT;
const room_id = process.env.NEXT_PUBLIC_HMS_ROOM_ID;

export default async function getToken(role: string) {
  const response = await fetch(`${endPoint}api/token`, {
    method: 'POST',
    body: JSON.stringify({
      role: role, 
      room_id,
    }),
  });

  const { token } = await response.json();

  return token;
}