import { React, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import "./formulario.css";
function Formulario() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const serviceId = import.meta.env.PUBLIC_VITE_APP_SERVICE_ID;
  const templateId = import.meta.env.PUBLIC_VITE_APP_TEMPLATE_ID;
  const publicKey = import.meta.env.PUBLIC_VITE_APP_PUBLIC_KEY;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

  const sanitizarInput = (text) => {
    return text.replace(/[^a-zA-Z0-9ÁáÉéÍíÓóÚúÜüÑñ ]/g, "").trim();
  };
  const sendEmail = async (data) => {
    setIsLoading(true);

    const nombreSanitizado = sanitizarInput(data.name);
    const telefonoSanitizado = sanitizarInput(data.telefono);
    const messageSanitizado = sanitizarInput(data.message);

    if (!nombreSanitizado || !messageSanitizado) {
      Swal.fire({
        title: "Campos inválidos",
        text: "Por favor, completa todos los campos correctamente.",
        icon: "warning",
      });
      setIsLoading(false);
      return;
    }
    console.log("Datos enviados:", data);

    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          name: nombreSanitizado,
          telefono: telefonoSanitizado,
          email: data.email,
          message: messageSanitizado,
        },
        publicKey
      );

      console.log("Email enviado con éxito:", response);

      reset();
      Swal.fire({
        title: "Formulario enviado con éxito!",
        text: "Te responderemos a la brevedad.",
        icon: "success",
      }).then(() => {
        window.location.href = "https://acequiones.vercel.app/";
      });
    } catch (error) {
      console.error("Error al enviar email:", error);
      Swal.fire({
        title: "Hubo un error!",
        text: "Inténtalo nuevamente.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="pt-44"></div>
      <div className="ms-6 mb-12">
        <h1 className="dark:text-white font-bold text-black text-3xl">
          Contacto
        </h1>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 ">
        <div>
          <form className="space-y-4" onSubmit={handleSubmit(sendEmail)}>
            <div className="form-group">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black dark:text-white"
              >
                Nombre completo (*)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("name", {
                  required: "El nombre es obligatorio",
                  minLength: {
                    value: 3,
                    message: "Tu nombre debe contener mínimo 3 caracteres",
                  },
                  maxLength: {
                    value: 40,
                    message: "Tu nombre es demasiado largo",
                  },
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/u,
                    message: "Solo se permiten letras y espacios",
                  },
                })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Campo de email */}
            <div className="form-group">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black dark:text-white"
              >
                Email (*)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: regexEmail,
                    message: "Ingresa un correo válido",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Campo de teléfono */}
            <div className="form-group">
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-black dark:text-white"
              >
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                autoComplete="tel"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("telefono", {
                  pattern: {
                    value: /^(?=.*[1-9])\d{6,16}$/,
                    message: "Se permiten minimo 6 números",
                  },
                })}
              />
              {errors.telefono && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.telefono.message}
                </p>
              )}
            </div>

            {/* Campo de mensaje */}
            <div className="form-group">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-black dark:text-white"
              >
                Mensaje (*)
              </label>
              <textarea
                id="message"
                name="message"
                autoComplete="off"
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-area"
                placeholder="Ingresa tu mensaje aquí (*)"
                {...register("message", {
                  required: "El mensaje es obligatorio",
                  minLength: {
                    value: 10,
                    message: "El mensaje debe contener mínimo 10 caracteres",
                  },
                })}
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Botón de enviar */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? (
                <>
                  <span>Enviando</span>
                  <svg
                    className="ml-2 h-4 w-4 animate-spin text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </>
              ) : (
                "Enviar"
              )}
            </button>
          </form>
        </div>
        <div className="flex flex-col">
          <div className="py-6 overflow-auto">
            <div className="max-w-full mx-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.401594148882!2d-65.34040102183505!3d-26.922480316412543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942245004c7c371f%3A0x283ea19f4be52a40!2sAcequiones!5e0!3m2!1ses!2sar!4v1739481146312!5m2!1ses!2sar"
                width="450"
                height="350"
                className="rounded-xl w-full map-hover"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Formulario;
