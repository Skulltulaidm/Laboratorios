import { useFetch } from '../hooks/useFetch';
import { useCounter } from '../hooks/useCounter';
import { Loading } from './Loading';
import { Card } from './Card';

export const CustomHook = () => {
    const { counter, decrement, increment } = useCounter(1);
    const { data, hasError, isLoading } = useFetch(`https://rickandmortyapi.com/api/character/${counter}`);

    return (
        <>
            <h1>Información de Personaje</h1>
            <hr />
            {hasError ? (
                <div>Error al cargar el personaje. Intenta nuevamente.</div>
            ) : (
                <>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <>
                            <Card
                                id={counter}
                                name={data?.name}
                                sprites={data?.image ? [data.image] : []}
                            />
                        </>
                    )}
                </>
            )}
            <button className='btn btn-primary' onClick={() => decrement()}>Anterior</button>
            <button className='btn btn-primary' onClick={() => increment()}>Siguiente</button>
        </>
    );
};
