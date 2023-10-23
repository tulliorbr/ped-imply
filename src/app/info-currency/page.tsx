"use client";
import Card from "@/components/Card";
import Image from "next/image";
import React, { useEffect } from "react";
import bitcoin from "../../assets/bitcoin.webp";
import sac from "../../assets/sac.png";
import { useDataForm } from "@/context/formDataSlice";
import { useSnackbarFunc } from "@/context/snackbarSlice";
import { useRouter } from "next/navigation";

interface IBitcoinData {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  disclaimer: string;
  chartName: string;
  bpi: {
    [currencyCode: string]: {
      code: string;
      symbol: string;
      rate: string;
      description: string;
      rate_float: number;
    };
  };
}

export default function InfoCurrency() {
  const [data, setData] = React.useState<IBitcoinData>({} as IBitcoinData);
  const router = useRouter();
  const { handleSnackbar } = useSnackbarFunc();
  const { dataForm } = useDataForm();

  const fetchInfoCurrency = async () => {
    try {
      const response = await fetch(
        `https://api.coindesk.com/v1/bpi/currentprice.json`
      );
      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
    }
  };

  const formatCurrency = (currency: string, value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  const formattedData = data.bpi ? Object.keys(data.bpi) : [];

  useEffect(() => {
    fetchInfoCurrency();
    if (Object.keys(dataForm).length === 0) {
      router.push("/");
      handleSnackbar(
        "É preciso preencher todos os campos para continuar",
        "error"
      );
    }
  }, []);

  return (
    <div className="w-screen min-h-screen my-5 sm:my-0 overflow-x-hidden items-center flex justify-center">
      <div className="w-11/12 h-auto max-w-[440px] flex flex-col items-center justify-center">
        <Card hasPadding={false}>
          <Image
            src={bitcoin}
            alt="bitcoin image"
            className="rounded-t-md h-36 object-cover"
          />
          <div className="px-[35px] py-[27px]">
            <p className="text-sm text-fontColor mb-12 text-justify ">
              A origem do BItcoin é tão interessante quanto a sua evolução no
              mercado. Criada há quase uma década, a moeda virtual alcançou
              patamares históricos de cotações, atraindo ainda mais visibilidade
              para a economia digital e transformando a criptomoeda em{" "}
              <strong>um dos investimentos mais atrativos do momento.</strong>
            </p>
            <div className="rounded-md bg-cardColor text-white px-7 py-6 ">
              <h1 className="font-black text-xl mb-6 whitespace-nowrap">
                Bitcoin Price Index
              </h1>
              <div className="text-sm px-2 pb-3">
                {formattedData?.map((currencyCode) => (
                  <div key={currencyCode}>
                    <p>
                      {data?.bpi[currencyCode]?.description}:{" "}
                      {formatCurrency(
                        currencyCode,
                        data.bpi[currencyCode].rate_float
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-fontColor text-justify my-12">
              O grande mistério do Bitcoin ainda não foi revelado.
              <br /> Afinal, quem inventou a criptomoeda? Existem várias
              versões, mas nenhuma conclusiva até o momento. O que se sabe é que
              o fundador usa o pseudônimo Satoshi Nakamoto.
            </p>
          </div>
        </Card>
      </div>
      <div
        onClick={() =>
          handleSnackbar(
            "Serviço indisponível no momento. Por favor, tente mais tarde!",
            "error"
          )
        }
        className="fixed cursor-pointer bottom-5 right-5 bg-white w-14 shadow-2xl rounded-full sm:w-[100px] sm:bottom-auto sm:right-0 sm:rounded-tl-[30px] sm:rounded-tr-none sm:rounded-br-none sm:rounded-bl-md sm:shadow-2xl"
      >
        <div className="flex flex-col items-center justify-center">
          <Image src={sac} alt="sac image" className="w-14 sm:w-[70px]" />
          <p className="text-xs text-fontColor font-bold hidden sm:flex">SAC</p>
        </div>
      </div>
    </div>
  );
}
