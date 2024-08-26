import Bar from "../bar/Bar";

export default function Layout(props) {
  return (
    <div className="layout">
      <main>
        <Bar />
        <>{props}</>
      </main>
      <footer>Weronika Rzeszutek | Katarzyna Sobczyszyn </footer>
    </div>
  );
}
