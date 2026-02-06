import { useStore } from "../store/globalState";

export const HomePage = () => {
  const { userProfile } = useStore();
  const name = userProfile.data?.userInfo.name ?? "";

  return (
    <section className="home-page">
      <h1>Hola! {name} Estás en la página de inicio</h1>
    </section>
  );
};
