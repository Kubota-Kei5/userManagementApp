import styles from "@/styles/UserDetail.module.css";

export default function InputItem({
  isEditing,
  htmlFor,
  labelName,
  ...inputProps
}) {
  return (
    <div className={styles.detailFormGroup}>
      <label htmlFor={htmlFor}>{labelName}</label>
      <input readOnly={!isEditing} type="text" required {...inputProps} />
    </div>
  );
}
