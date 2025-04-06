
function Error({ statusCode }: { statusCode: number }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Ups! Algo salió mal.</h1>
      <p>Error: {statusCode || 500}</p>
      <p>Estamos trabajando en ello.</p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
