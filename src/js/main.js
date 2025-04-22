// src/js/main.js
// Script principal para funcionalidades dinámicas, con logs de depuración.

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente cargado y parseado."); // Log 1: Confirma que el evento se dispara

  // Obtener referencias a los elementos del DOM
  /* const asciiArtContainer = document.getElementById("ascii-art"); */
  const hashtagsOutput = document.getElementById("hashtags-output");
  const introOutput = document.getElementById("intro-output");
  const cursorSpan = document.querySelector(".blinking-cursor"); // Referencia al cursor

  // Log 2: Verifica si los elementos clave y el cursor se encontraron
  console.log("Elementos encontrados:", {
    /* asciiArtContainer: !!asciiArtContainer, // true si encontrado, false si no */
    hashtagsOutput: !!hashtagsOutput,
    introOutput: !!introOutput,
    cursorSpan: !!cursorSpan,
  });

  // --- ASCII Art ---
  //   const asciiArt = `
  //  #     #     #     #        ######   #######  #######  ######      #     #######     #
  //  #     #    # #    #        #     #  #             #   #     #    # #       #       # #
  //  #     #   #   #   #        #     #  #            #    #     #   #   #      #      #   #
  //  #     #  #     #  #        #     #  #####       #     #     #  #     #     #     #     #
  //   #   #   #######  #        #     #  #          #      #     #  #######     #     #######
  //    # #    #     #  #        #     #  #         #       #     #  #     #     #     #     #
  //     #     #     #  #######  ######   #######  #######  ######   #     #     #     #     #
  //
  // `;
  // --- Contenido para escribir ---
  const hashtags =
    "#dataengineering #datainfra #mlops #dataintegrity #ai #dataops #bigdata #businessintelligence #security";
  const introText = `Soy Omar Valdez, Arquitecto de Datos con experiencia real en todo el ecosistema: Ingeniería, Infraestructura, BI, MLOps, IA y más.

Aquí encontrarás información sobre las herramientas que uso (~/usos) y mi enfoque en el mundo de los datos (~/whoami).

Para tutoriales prácticos y contenido sobre datos, te invito a visitar mis redes sociales usando los enlaces de abajo.`;

  // --- Función de Escritura ---
  function typeWriter(element, text, speed = 50, callback) {
    if (!element) {
      console.error("Error: Elemento para typeWriter no encontrado.");
      if (callback) callback();
      return;
    }

    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        // Corrección: Usar textContent para evitar interpretar HTML accidentalmente,
        // excepto para <br> explícito.
        const char = text.charAt(i);
        if (char === "\\" && text.charAt(i + 1) === "n") {
          element.innerHTML += "<br>"; // Permitir saltos de línea explícitos con \n
          i++; // Saltar la 'n'
        } else {
          element.appendChild(document.createTextNode(char)); // Más seguro
        }
        i++;

        if (cursorSpan) {
          element.appendChild(cursorSpan); // Mover cursor al final
        } else {
          console.warn("Cursor span no encontrado para mover.");
        }
        setTimeout(type, speed);
      } else {
        console.log(
          `Typewriter terminó para el elemento:`,
          element.id || element,
        );
        if (cursorSpan) {
          element.insertAdjacentElement("beforeend", cursorSpan);
        }
        if (callback) {
          callback();
        }
      }
    }
    console.log(`Iniciando typewriter para:`, element.id || element);
    type();
  }

  // --- Lógica específica para la página de inicio ---
  // Need ASCII Art then add const
  if (hashtagsOutput && introOutput && cursorSpan) {
    console.log("Ejecutando lógica de la página de inicio.");

    // asciiArtContainer.textContent = asciiArt; // Usar textContent es más seguro para ASCII
    // console.log("ASCII Art mostrado.");

    cursorSpan.style.display = "none";

    setTimeout(() => {
      console.log("Timeout finalizado, iniciando escritura de hashtags.");
      cursorSpan.style.display = "inline-block";
      hashtagsOutput.appendChild(cursorSpan); // Mover cursor al inicio

      typeWriter(hashtagsOutput, hashtags, 30, () => {
        console.log("Hashtags terminados, iniciando escritura de intro.");
        introOutput.appendChild(cursorSpan); // Mover cursor al siguiente
        typeWriter(introOutput, introText, 20);
      });
    }, 500);
  } else {
    // --- Lógica para otras páginas ---
    console.log("No se detectó la página de inicio o faltan elementos/cursor.");
    const mainContentOutput = document.querySelector(".output-area");
    if (mainContentOutput && cursorSpan && !asciiArtContainer) {
      mainContentOutput.appendChild(cursorSpan);
      cursorSpan.style.display = "inline-block";
      console.log(
        "Cursor posicionado al final del contenido en página no-home.",
      );
    } else if (!cursorSpan) {
      console.warn(
        "El elemento cursor '.blinking-cursor' no se encontró en el DOM.",
      );
    } else if (!mainContentOutput) {
      console.warn("El elemento '.output-area' no se encontró en el DOM.");
    } else if (asciiArtContainer) {
      // Si es la página de inicio pero faltan otros elementos (hashtagsOutput, introOutput)
      console.warn(
        "Detectada página de inicio pero faltan #hashtags-output o #intro-output.",
      );
      // Podrías querer mover el cursor aquí también si lo deseas
      mainContentOutput.appendChild(cursorSpan);
      cursorSpan.style.display = "inline-block";
    }
  }
});
