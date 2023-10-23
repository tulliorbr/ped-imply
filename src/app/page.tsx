"use client";
import Card from "@/components/Card";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { validate } from "cpf-check";
import { useRouter } from "next/navigation";
import { useSnackbarFunc } from "@/context/snackbarSlice";
import Button from "@/components/Button";
import FormRow from "@/components/FormRow";
import { useEffect } from "react";
import { useModal } from "@/context/modalSlice";
import { useDataForm } from "@/context/formDataSlice";

interface IForm {
  number?: string | undefined;
  city?: string | undefined;
  district?: string | undefined;
  place?: string | undefined;
  cpf: string;
  cep: string;
  phone: string;
  name: string;
  email: string;
}

export default function Home() {
  const router = useRouter();
  const { handleSnackbar } = useSnackbarFunc();
  const { handleModal } = useModal();
  const { setDataForm } = useDataForm();

  const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    email: yup
      .string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    phone: yup.string().required("Telefone é obrigatório"),
    cpf: yup
      .string()
      .required("CPF é obrigatório")
      .test("valid-cpf", "CPF inválido", (value) => {
        if (!value) return true;
        return validate(value);
      }),
    cep: yup.string().required("CEP é obrigatório"),
    city: yup.string(),
    district: yup.string(),
    place: yup.string(),
    number: yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      cep: "",
      city: "",
      district: "",
      place: "",
      number: "",
    },
  });

  const fetchCepData = async (cep: string) => {
    // Também pode ser feito com Axios, que é o que utilizo no dia-a-dia, mas preferi usar o nativo do JS.
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
      const data = await response.json();
      if (data.erro) {
        setError("cep", { message: "CEP inválido" });
        return;
      }
      setValue("city", data.localidade);
      setValue("district", data.bairro);
      setValue("place", data.logradouro);
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    }
  };

  const handleSubmitForm = (dataForm: IForm) => {
    if (dataForm) {
      setDataForm(dataForm);
      router.push("/info-currency");
      handleModal("Cadastro realizado com sucesso!", "success");
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      handleSnackbar(
        "Verifique as informações do formulário para continuar",
        "error"
      );
    }
  }, [errors]);

  return (
    <div className="w-screen min-h-screen my-5 sm:my-0 overflow-x-hidden items-center flex justify-center">
      <div className="w-11/12 h-auto max-w-[440px] flex flex-col items-center justify-center">
          <Card>
            <h1 className="text-buttonColor font-semibold text-xl">
              Cadastro de usuário
            </h1>
            <p className="mb-8 text-sm text-fontColor">
              Utilize esse cadastro para fazer parte do maior site de trade de
              Bitcoin do mundo.
            </p>
            <Input
              id="name"
              title="Nome completo"
              register={register}
              onChange={(e) => setValue("name", e.target.value)}
              required
              maskType="onlyLetters"
              error={errors.name?.message}
            />
            <Input
              id="email"
              title="E-mail"
              register={register}
              onChange={(e) => setValue("email", e.target.value)}
              required
              error={errors.email?.message}
            />
            <FormRow>
              <Input
                id="phone"
                title="Telefone"
                register={register}
                onChange={(e) => setValue("phone", e.target.value)}
                required
                maskType="phone"
                error={errors.phone?.message}
              />
              <Input
                id="cpf"
                title="CPF"
                register={register}
                onChange={(e) => setValue("cpf", e.target.value)}
                required
                maskType="cpf"
                error={errors.cpf?.message}
              />
            </FormRow>
            <FormRow>
              <Input
                id="cep"
                title="CEP"
                register={register}
                required
                maskType="cep"
                error={errors.cep?.message}
                onChange={(e) => {
                  const cep = e.target.value.replace(/\D/g, "");
                  clearErrors("cep");
                  setValue("cep", e.target.value);
                  if (cep.length === 8) {
                    fetchCepData(cep);
                  }
                }}
              />
              <Input
                id="city"
                title="Cidade"
                register={register}
                onChange={(e) => setValue("city", e.target.value)}
                error={errors.city?.message}
              />
            </FormRow>
            <Input
              id="district"
              title="Bairro"
              register={register}
              onChange={(e) => setValue("district", e.target.value)}
              error={errors.district?.message}
            />
            <FormRow>
              <Input
                id="place"
                title="Logradouro"
                register={register}
                onChange={(e) => setValue("place", e.target.value)}
                error={errors.place?.message}
              />
              <Input
                id="number"
                title="Número"
                register={register}
                onChange={(e) => setValue("number", e.target.value)}
                maskType="onlyNumbers"
                error={errors.number?.message}
              />
            </FormRow>
            <Button
              label="CADASTRAR"
              onClick={handleSubmit(handleSubmitForm)}
            />
          </Card>
        <p className="mt-8 text-sm text-white">
          Os cookies são utilizados para facilitar a navegação e torná-la mais
          simples e não danificam o seu dispositivo. Permitem uma navegação mais
          rápida e eficiente, eliminando a necessidade de introduzir
          repetidamente as mesmas informações.
        </p>
      </div>
    </div>
  );
}
