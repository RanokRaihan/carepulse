import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";

const RegisterPage = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            width={1000}
            height={1000}
            alt="paitent"
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user} />
          <div className="text-14-regular mt-20 flex justify-between pb-4">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePulse
            </p>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        alt="doctors images"
        height={1000}
        width={1000}
        className="side-img max-w-[490px]"
      />
    </div>
  );
};

export default RegisterPage;
