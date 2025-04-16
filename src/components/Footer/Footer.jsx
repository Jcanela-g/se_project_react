import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__name">Developed by Jose Canela</p>
      <p className="footer__date">{currentYear}</p>
    </footer>
  );
}
