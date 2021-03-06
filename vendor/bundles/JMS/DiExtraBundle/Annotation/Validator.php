<?php

/*
 * Copyright 2011 Johannes M. Schmitt <schmittjoh@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace JMS\DiExtraBundle\Annotation;

use JMS\DiExtraBundle\Exception\InvalidTypeException;

/** @Annotation */
final class Validator
{
    public $alias;

    public function __construct(array $values)
    {
        if (isset($values['alias'])) {
            $values['value'] = $values['alias'];
        }

        if (!isset($values['value'])) {
            throw new \InvalidArgumentException('A value must be given for @Validator annotations.');
        }
        if (!is_string($values['value'])) {
            throw new InvalidTypeException('Validator', 'value', 'string', $values['value']);
        }
        $this->alias = $values['value'];
    }
}