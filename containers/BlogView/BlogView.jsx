import React from "react";
import { ImageBox } from "../../components";
import Style from "./BlogView.module.scss";

function BlogView() {
  return (
    <div className={Style.BlogView}>
      <div className={Style.TopContainer}>
        <div
          className={Style.imageContainer}
          style={{
            background: `url('https://images.unsplash.com/photo-1666808982292-501b1e002171?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>

        <div className={Style.infoContainer}>
          <p className={Style.title}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, dolor.
          </p>
          <p className={Style.data}>22 October 2022 | Author Name</p>
        </div>
      </div>
      <div className={Style.ContentContainer}>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
          deserunt totam recusandae ipsum libero consequuntur nihil, laborum
          atque doloribus nostrum, optio asperiores repellat architecto qui eum
          consequatur quam nam sunt et necessitatibus soluta tenetur aspernatur.
          Temporibus modi omnis excepturi consequuntur ducimus sapiente, illum
          harum architecto alias voluptates commodi voluptate minima dolorem
          ullam provident quam nisi totam eveniet cum est, quis perferendis
          obcaecati laudantium? Veniam voluptatibus ad ab quaerat. Facilis sequi
          mollitia doloribus in adipisci, necessitatibus, veritatis perspiciatis
          aliquam eos ad quisquam id doloremque ullam error recusandae,
          aspernatur nihil. Qui corporis esse reprehenderit voluptate. Dolorum
          exercitationem, minus dolores necessitatibus ratione iusto.
        </p>
      </div>
    </div>
  );
}

export default BlogView;
