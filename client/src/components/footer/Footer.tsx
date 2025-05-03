import React from "react";
import FooterLogo from "./FooterLogo";
import FooterLinkColumn from "./FooterLinkColumn";
import FooterSocial from "./FooterSocial";
import FooterCopyright from "./FooterCopyright";
import BackToTop from "./BackToTop";

const Footer: React.FC = () => {
  const aboutLinks = [
    { title: "About Us", href: "#" },
    { title: "Customer Support", href: "#" },
    { title: "Contact Us", href: "/contact" },
  ];

  const servicesLinks = [
    { title: "Shop", href: "/shop" },
    { title: "Discounts", href: "shop" },
    { title: "My Cart", href: "/cart" },
  ];

  const companyLinks = [
    { title: "Register", href: "/register" },
    { title: "Contact Us", href: "/contact" },
    { title: "About Us", href: "/about" },
  ];

  return (
    <footer className="w-full mt-10  bg-gray-50 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and social media section */}
          <div className="space-y-6">
            <FooterLogo />
            <FooterSocial />
          </div>

          {/* Link columns */}
          <FooterLinkColumn title="About" links={aboutLinks} />
          <FooterLinkColumn title="Our Services" links={servicesLinks} />
          <FooterLinkColumn title="Our Company" links={companyLinks} />
        </div>
      </div>
      <div className="">
        {/* Divider */}
        <hr className="my-8 border-gray-200" />

        {/* Copyright section */}
        <FooterCopyright />
      </div>

      {/* Back to top button */}
      <BackToTop />
    </footer>
  );
};

export default Footer;
