import { useEffect, useRef, useState } from "react";
import { alpha } from "@mui/material/styles";
import { Box, MenuItem, Stack, IconButton } from "@mui/material";
import MenuPopover from "components/MenuPopover";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";

const LANGS = [
  {
    value: "en",
    label: "English",
    icon: "/assets/ic_flag_en.svg",
  },
  {
    value: "hi",
    label: "हिन्दी",
    icon: "/assets/ic_flag_in.svg",
  },
  {
    value: "ar",
    label: "العربية",
    // dir: "rtl",
    icon: "/assets/ic_flag_ar.svg",
  },
  {
    value: "fr",
    label: "français",
    // dir: "rtl",
    icon: "/assets/ic_flag_fr.svg",
  },
  {
    value: "gr",
    label: "deutsch",
    // dir: "rtl",
    icon: "/assets/ic_flag_gr.svg",
  },
];

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = LANGS.find((l) => l.value === currentLanguageCode);
  const cLIndex = LANGS.findIndex((l) => l.value === currentLanguageCode);
  const { t } = useTranslation();

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("app_title");
  }, [currentLanguage, t]);

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <img src={LANGS[cLIndex].icon} alt={LANGS[cLIndex].label} width="28" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[cLIndex].value}
              onClick={() => {
                i18next.changeLanguage(option.value);
                handleClose();
              }}
            >
              <Box
                component="img"
                alt={option.label}
                src={option.icon}
                sx={{ width: 28, mr: 2 }}
              />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
