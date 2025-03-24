import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-items">
        <div className="copyright-section">
          <h2 className="main-title">Datakilde og attribusjon</h2>
          <p>Denne applikasjonen bruker data fra to kilder:</p>
          
          <div className="attribution-source">
            <h3 className="source-title">Bokmålsordboka og Nynorskordboka</h3>
            <p>
              Utviklet av Språkrådet og Universitetet i Bergen.
              <a href='https://ordbøkene.no' target='_blank' rel="noopener noreferrer">ordbøkene.no</a>
            </p>
          </div>
          
          <div className="attribution-source">
            <h3 className="source-title">Norsk Scrabbleforbund (NSF)</h3>
            <p>
              Laget av språkkomiteen.
              <a href='http://www2.scrabbleforbundet.no' target='_blank' rel="noopener noreferrer">scrabbleforbundet.no</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;