import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer({ brandName, brandLink, routes }) {
  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          Một sản phẩm đến từ @Nguyen Duy Thinh ❤
        </Typography>
        <ul className="flex items-center gap-4"></ul>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Gitlab",
  brandLink: "gitlab.com/DuyThinh/greenbook-web",
  routes: [{ name: "gitlab", path: "gitlab.com/DuyThinh/greenbook-web" }],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
