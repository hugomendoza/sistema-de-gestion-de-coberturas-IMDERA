import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (user: any) => void;
  classes: { id: string; name: string }[];
}

export function AddUserModal({ isOpen, onClose, onAdd, classes }: AddUserModalProps) {
  const [form, setForm] = useState({
    nombre: '',
    edad: '',
    genero: '',
    whatsapp: '',
    discapacidad: '',
    grupoEtnico: '',
    poblacionVulnerable: '',
    claseId: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleGeneroChange = (value: string) => {
    setForm({ ...form, genero: value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!form.edad) newErrors.edad = 'La edad es obligatoria';
    if (!form.genero) newErrors.genero = 'El género es obligatorio';
    if (!form.whatsapp) newErrors.whatsapp = 'El WhatsApp/teléfono es obligatorio';
    if (form.whatsapp && !/^\d+$/.test(form.whatsapp)) newErrors.whatsapp = 'Solo números';
    if (!form.claseId) newErrors.claseId = 'Debe asignar una clase';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      onAdd(form);
      setForm({
        nombre: '',
        edad: '',
        genero: '',
        whatsapp: '',
        discapacidad: '',
        grupoEtnico: '',
        poblacionVulnerable: '',
        claseId: ''
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre *</Label>
            <Input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} />
            {errors.nombre && <span className="text-xs text-red-500">{errors.nombre}</span>}
          </div>
          <div>
            <Label htmlFor="edad">Edad *</Label>
            <Input id="edad" name="edad" value={form.edad} onChange={handleChange} type="number" min="0" />
            {errors.edad && <span className="text-xs text-red-500">{errors.edad}</span>}
          </div>
          <div>
            <Label htmlFor="genero">Género *</Label>
            <Select value={form.genero} onValueChange={handleGeneroChange}>
              <SelectTrigger id="genero" name="genero">
                <SelectValue placeholder="Selecciona género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="masculino">Masculino</SelectItem>
                <SelectItem value="femenino">Femenino</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
            {errors.genero && <span className="text-xs text-red-500">{errors.genero}</span>}
          </div>
          <div>
            <Label htmlFor="whatsapp">WhatsApp/Teléfono *</Label>
            <Input id="whatsapp" name="whatsapp" value={form.whatsapp} onChange={handleChange} />
            {errors.whatsapp && <span className="text-xs text-red-500">{errors.whatsapp}</span>}
          </div>
          <div>
            <Label htmlFor="discapacidad">Discapacidad</Label>
            <Select value={form.discapacidad} onValueChange={v => handleSelectChange('discapacidad', v)}>
              <SelectTrigger id="discapacidad" name="discapacidad">
                <SelectValue placeholder="Selecciona discapacidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ninguna">Ninguna</SelectItem>
                <SelectItem value="visual">Visual</SelectItem>
                <SelectItem value="auditiva">Auditiva</SelectItem>
                <SelectItem value="intelectual">Intelectual</SelectItem>
                <SelectItem value="fisica">Física</SelectItem>
                <SelectItem value="psicosocial">Psicosocial</SelectItem>
                <SelectItem value="otra">Otra</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="grupoEtnico">Grupo Étnico</Label>
            <Select value={form.grupoEtnico} onValueChange={v => handleSelectChange('grupoEtnico', v)}>
              <SelectTrigger id="grupoEtnico" name="grupoEtnico">
                <SelectValue placeholder="Selecciona grupo étnico" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ninguno">Ninguno</SelectItem>
                <SelectItem value="indigena">Indígena</SelectItem>
                <SelectItem value="afrodescendiente">Afrodescendiente</SelectItem>
                <SelectItem value="raizal">Raizal</SelectItem>
                <SelectItem value="palenquero">Palenquero</SelectItem>
                <SelectItem value="rom">Rom (Gitano)</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="poblacionVulnerable">Población Vulnerable</Label>
            <Select value={form.poblacionVulnerable} onValueChange={v => handleSelectChange('poblacionVulnerable', v)}>
              <SelectTrigger id="poblacionVulnerable" name="poblacionVulnerable">
                <SelectValue placeholder="Selecciona población vulnerable" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ninguna">Ninguna</SelectItem>
                <SelectItem value="victima">Víctima del conflicto</SelectItem>
                <SelectItem value="desplazado">Desplazado</SelectItem>
                <SelectItem value="migrante">Migrante</SelectItem>
                <SelectItem value="lgbtiq">LGBTIQ+</SelectItem>
                <SelectItem value="adulto-mayor">Adulto mayor</SelectItem>
                <SelectItem value="madre-cabeza">Madre cabeza de hogar</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Campo 'otros' eliminado, ahora se asigna clase */}
          <div>
            <Label htmlFor="claseId">Asignar a clase *</Label>
            <Select value={form.claseId} onValueChange={v => handleSelectChange('claseId', v)}>
              <SelectTrigger id="claseId" name="claseId">
                <SelectValue placeholder="Selecciona clase" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.claseId && <span className="text-xs text-red-500">{errors.claseId}</span>}
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Agregar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
