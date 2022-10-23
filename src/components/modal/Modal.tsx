import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { TextField } from "@mui/material";
import axios from "axios";
import { FC, useState } from "react";
import { useAuthContext } from "../../InfiniteContext";
import { MyPosition } from "../../interface";
import { mutate } from "swr";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal: FC<{
  position: { lat: number; lng: number };
  myPosition: MyPosition;
  close(): void;
}> = ({ position, myPosition, close }) => {
  let { myEmail } = useAuthContext();

  if (myEmail == "") {
    myEmail = localStorage.getItem("email") || "";
  }
  const [open, setOpen] = React.useState(true);
  const [prayText, setPrayText] = useState<string>("");

  const onSubmit = async (data: string) => {
    try {
      await axios.post(
        `/api/v1/${myEmail}/pray`,
        {
          ...position,
          ...myPosition,
          content: data,
          refid: 0,
        },
        { headers: { Authorization: `Bearer ${myEmail}` } }
      );
      close();
      await mutate(`/api/v1/${myEmail}/pray`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {/*<Button variant="outlined" onClick={handleClickOpen}>*/}
      {/*  Open full-screen dialog*/}
      {/*</Button>*/}
      <Dialog fullScreen open={open} onClose={close} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1, textAlign: "center" }} variant="h6" component="div">
              Start New Prayer Chain
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={close}
              aria-label="close"
              sx={{ position: "absolute", right: 20 }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <TextField
          variant="outlined"
          placeholder="Let's Pray"
          multiline
          rows={8}
          sx={{ padding: 5 }}
          onChange={(e) => {
            setPrayText(e.target.value);
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Button variant="outlined" onClick={close}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onSubmit(prayText);
            }}
          >
            Submit
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Modal;
