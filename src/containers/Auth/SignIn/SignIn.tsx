import { FC, memo, useEffect, useState } from "react";
import styles from "./SignIn.module.scss";
import logoHigh from "src/resources/images/logo_high.svg";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import { ISignIn } from "src/models/IAuthModel";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import { authSignIn, authSignUp } from "src/store/actions/AuthAction";
import messageQueueAction from "src/store/actions/MessageQueueAction";
import CircularIndeterminate from "src/components/CircularIndeterminate";

const CustomTextField = styled(TextField)`
  width: 100%;

  .MuiOutlinedInput-root {
    font-family: "Golos Text";
    border-radius: 6px;
    border-color: #a074ff;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.32px;

    &.Mui-focused fieldset {
      border-color: #a074ff;
      color: #a074ff;
    }
  }

  .MuiInputLabel-root {
    color: #a074ff;
    font-family: "Golos Text";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.28px;

    &.Mui-focused {
      color: #a074ff;
    }
  }
`;

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 18,
  height: 18,
  borderColor: "#A074FF",
  "&.MuiCheckbox-root": {
    color: "yellow",
  },

  border: "1px solid var(--colors-violet, #A074FF)",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "transparent",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "transparent",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    marginLeft: "1.5px",
    marginTop: "0.8px",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='15' viewBox='0 0 14 15' fill='none'%3E%3Cpath d='M5.75172 10.9999C5.67173 10.9997 5.59265 10.983 5.5194 10.9509C5.44614 10.9188 5.38027 10.8719 5.32588 10.8133L2.49088 7.79745C2.38491 7.68451 2.32814 7.5341 2.33306 7.3793C2.33798 7.22451 2.4042 7.07801 2.51713 6.97203C2.63007 6.86606 2.78048 6.80928 2.93528 6.81421C3.09007 6.81913 3.23657 6.88534 3.34255 6.99828L5.74588 9.55911L10.6517 4.19245C10.7015 4.13045 10.7634 4.07929 10.8337 4.0421C10.904 4.00491 10.9811 3.98248 11.0604 3.97619C11.1397 3.9699 11.2194 3.97988 11.2946 4.00552C11.3699 4.03116 11.4391 4.07191 11.4981 4.12527C11.557 4.17864 11.6044 4.24349 11.6374 4.31585C11.6703 4.3882 11.6882 4.46653 11.6898 4.54603C11.6914 4.62552 11.6767 4.7045 11.6466 4.77812C11.6166 4.85174 11.5718 4.91843 11.515 4.97411L6.18338 10.8074C6.12951 10.8672 6.06387 10.9151 5.99059 10.9482C5.9173 10.9813 5.83796 10.9989 5.75755 10.9999H5.75172Z' fill='%23A074FF'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "transparent",
  },
});

// Inspired by blueprintjs
function BpCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "transparent" },
        padding: 0,
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}

/**
 * Функциональный компонент авторизации пользователя
 * @returns
 */
const SignIn: FC<any> = () => {
  const navigate = useNavigate();
  const authSelector = useAppSelector((s) => s.authReducer);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<ISignIn>({
    email: null,
    password: null,
  });

  const onChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSignUp = () => {
    if (!form.email) {
      dispatch(messageQueueAction.addMessage(null, "error", "Введите email"));
      return;
    }

    if (!form.password) {
      dispatch(messageQueueAction.addMessage(null, "error", "Введите пароль"));
      return;
    }

    dispatch(
      authSignIn(
        {
          email: form.email,
          password: form.password,
        },
        () => {
          navigate("/");
        }
      )
    );
  };

  const handleKeyPress = (event: any) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    // Разрешить ввод только цифр
    if (!/^[0-9]*$/g.test(keyValue)) {
      event.preventDefault();
    }
  };

  return (
    <>
      {authSelector.isLoading && <CircularIndeterminate />}
      <div className={styles.container}>
        <div className={styles.title}>
          <p className={styles.titleH}>Авторизация пользователя</p>
        </div>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            onSignUp();
          }}
        >
          <CustomTextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="text"
            name="email"
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <CustomTextField
            name="password"
            onChange={onChange}
            id="outlined-basic"
            label="Пароль"
            variant="outlined"
            type={passwordVisible ? "text" : "password"}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handlePasswordVisibilityToggle}
                    edge="end"
                  >
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <button type="submit" className={styles.btn}>
            Авторизация
          </button>
          <button
            type="button"
            className={styles.btnSignUp}
            onClick={() => {
              navigate("/auth/sign-up");
            }}
          >
            Регистрация
          </button>
        </form>
      </div>
    </>
  );
};

export default memo(SignIn);
