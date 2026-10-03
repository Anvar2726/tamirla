import { ROLES, ROLE_LABELS } from "@/entities/user/model/roles";
import styles from "./RoleSwitcher.module.scss";
import { useRoleStore } from "@/entities/user/model/useRoleStore";

export default function RoleSwitcher() {
  const role = useRoleStore((state) => state.role);
  const setRole = useRoleStore((state) => state.setRole);

  return (
    <label className={styles.field}>
      <span>Rol:</span>
      <select
        className={styles.select}
        value={role}
        onChange={(event) => setRole(event.target.value)}
      >
        {Object.values(ROLES).map((roleValue) => (
          <option key={roleValue} value={roleValue}>
            {ROLE_LABELS[roleValue]}
          </option>
        ))}
      </select>
    </label>
  );
}
