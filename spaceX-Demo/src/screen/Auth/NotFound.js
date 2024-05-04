import React from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          <span className="text-danger">{t("sorry")}</span> {t("Page_not_found")}
        </p>
        <p className="lead">{t("page_not_exist")}</p>
        <a href="/" className="btn btn-primary">
          {t("go_home")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
