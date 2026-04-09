import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import avatar1 from "/assets/user-avatar.png";
import avatar2 from "/assets/user-avatar.png";
import avatar3 from "/assets/user-avatar.png";

export default function ImageAvatars() {
  const avatars = [avatar1, avatar2, avatar3];

  return (
    <Stack direction="row" spacing={-1}>
      {avatars.map((img, index) => (
        <Avatar
          key={index}
          src={img}
          sx={{
            boxShadow: 1,
          }}
        />
      ))}
      <Avatar
        sx={{
          bgcolor: "primary.main",
          fontSize: 14,
          border: "2px solid white",
          boxShadow: 1,
        }}
      >
        +500
      </Avatar>
    </Stack>
  );
}
