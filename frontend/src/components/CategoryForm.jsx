import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import useModal from "@/store/useModalStore";
import { moneyFormat } from "@/utils/moneyFormat";
import { walletSchema } from "@/schemas/walletSchema";
import useCategory from "@/store/useCategoryStore";

const CategoryForm = () => {
  const closeModal = useModal((state) => state.closeModal);
  const addCategory = useCategory((state) => state.addCategory);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data) => {
    const dataWithId = {
      id: crypto.randomUUID(),
      ...data,
    };

    addCategory(dataWithId);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <label htmlFor="name" className="font-semibold">
            Category Name:
          </label>
          <Input
            id="name"
            {...register("name")}
            type="text"
            className={`
              border-neutral-300 bg-[#F5F5F5]
              ${errors.name ? "border-red-500 border-2" : "border-neutral-300"}
            `}
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>

        <Button
          disabled={!isValid}
          className={`mt-2 bg-blue-600 hover:bg-blue-700`}
        >
          Add Category
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
