export default function AddressInputs({
  addressProps,
  setAddressProps,
  disabled = false,
}) {
  const { phone, streetAddress, postal, country, city } = addressProps;

  return (
    <>
      <label>Phone Number</label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Phone Number"
        value={phone || ""}
        onChange={(ev) => setAddressProps("phone", ev.target.value)}
      />
      <label>Street Address</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Street Address"
        value={streetAddress || ""}
        onChange={(ev) => setAddressProps("streetAddress", ev.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            value={city || ""}
            onChange={(ev) => setAddressProps("city", ev.target.value)}
          />
        </div>
        <div>
          <label>Postal Code</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Postal Code"
            value={postal || ""}
            onChange={(ev) => setAddressProps("postal", ev.target.value)}
          />
        </div>
      </div>
      <label>Country</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Country"
        value={country || ""}
        onChange={(ev) => setAddressProps("country", ev.target.value)}
      />
    </>
  );
}
