import PropTypes from 'prop-types';

const Alertas = ({ alerta }) => {
  return (
    <div
      className={`${ alerta.error ? "from-red-400 to-red-600"
          : "from-indigo-500 to-indigo-600"
      } bg-gradient-to-t text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`}
    >
      {alerta.msg}
    </div>
  );
};

Alertas.propTypes = {
  alerta: PropTypes.shape({
    error: PropTypes.bool.isRequired,
    msg: PropTypes.string.isRequired  // Agrega la validación para la propiedad 'msg'
  }).isRequired
};

export default Alertas;
